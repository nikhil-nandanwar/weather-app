import SearchHistory from "../model/SearchHistory.model.js";

// Save search to history
export async function saveSearchHistory(req, res) {
  const { cityName, country, coordinates } = req.body;

  if (!cityName) {
    return res.status(400).json({ message: "City name is required" });
  }

  try {
    // Create new search history entry
    const searchEntry = new SearchHistory({
      cityName,
      country: country || "",
      coordinates: coordinates || {},
    });

    await searchEntry.save();

    // Keep only the last 5 searches by deleting older ones
    const allSearches = await SearchHistory.find()
      .sort({ searchedAt: -1 })
      .limit(5);

    if (allSearches.length >= 5) {
      const oldestId = allSearches[allSearches.length - 1]._id;
      await SearchHistory.deleteMany({
        searchedAt: { $lt: allSearches[allSearches.length - 1].searchedAt },
      });
    }

    res.status(201).json({
      message: "Search saved successfully",
      data: searchEntry,
    });
  } catch (error) {
    console.log("ERROR in saveSearchHistory:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// Get last 5 searches
export async function getSearchHistory(req, res) {
  try {
    const searches = await SearchHistory.find()
      .sort({ searchedAt: -1 })
      .limit(5);

    res.status(200).json({
      message: "Search history retrieved successfully",
      data: searches,
    });
  } catch (error) {
    console.log("ERROR in getSearchHistory:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
