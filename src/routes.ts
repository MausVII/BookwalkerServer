import { Router } from "express"
import { getBook, getBooks, getHighestRanked, getHighestRankedMonthly, getMangas, getNovels, getOldestVols, getRecentMangas, getRecentNovels, getRecentVols, getVolsOne } from "./controllers/Book"
import { createDeals, getCoinBackBooks, getDeals, getDiscountedBooks, getFreeBooks } from "./controllers/Deals"
import { getGenreBooks, getGenreData, getGenres, getRecentGenreBooks } from "./controllers/Genre"
import { getPublisherBooks, getPublisherData, getPublishers, getRecentPublisherBooks } from "./controllers/Publisher"
import { createSeries, getSeries, getSeriesBooks } from "./controllers/Series"
import { getAuthUser, Login, Logout, Refresh, Register } from "./controllers/User"

export const routes = (router: Router) => {
    router.get("/api/books", getBooks)
    router.get("/api/books/vols-1", getVolsOne)
    router.get("/api/books/recent", getRecentVols)
    router.get("/api/books/highest-ranked", getHighestRanked)
    router.get("/api/books/highest-ranked/month", getHighestRankedMonthly)
    router.get("/api/books/recent-mangas", getRecentMangas)
    router.get("/api/books/recent-novels", getRecentNovels)
    router.get("/api/books/oldest", getOldestVols)
    router.get("/api/books/mangas", getMangas)
    router.get("/api/books/light-novels", getNovels)
    router.get("/api/books/mangas/recent", getRecentMangas)
    router.get("/api/books/light-novels/recent", getRecentNovels)
    router.get("/api/books/:id", getBook)
    // Genre related routes
    router.get("/api/genres", getGenres)
    router.get("/api/genres/:id/data", getGenreData)
    router.get("/api/genres/:id", getGenreBooks)
    router.get("/api/genres/:id/recent", getRecentGenreBooks)
    // Publisher related routes
    router.get("/api/publishers", getPublishers)
    router.get("/api/publishers/:id/data", getPublisherData)
    router.get("/api/publishers/:id", getPublisherBooks)
    router.get("/api/publishers/:id/recent", getRecentPublisherBooks)
    // Series related routes
    router.post("/api/series/create", createSeries) 
    router.get("/api/series", getSeries)
    router.get("/api/series/:id", getSeriesBooks)
    // Deal related routes
    router.get("/api/deals", getDeals)
    router.post("/api/deals/create", createDeals)
    router.get("/api/deals/free", getFreeBooks)
    router.get("/api/deals/coin-back", getCoinBackBooks)
    router.get("/api/deals/discount", getDiscountedBooks)
    // Auth related routes
    router.post("/api/register", Register) 
    router.post("/api/login", Login)
    router.get("/api/user", getAuthUser)
    router.post("/api/refresh", Refresh)
    router.post("/api/logout", Logout)
    // router.post("/api/two_factor", TwoFactor)
    // router.post("/api/forgot", ForgotPassword)
    // router.post("/api/reset", ResetPassword)
}
