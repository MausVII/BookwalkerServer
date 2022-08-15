"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const Book_1 = require("./controllers/Book");
const Deals_1 = require("./controllers/Deals");
const Genre_1 = require("./controllers/Genre");
const Publisher_1 = require("./controllers/Publisher");
const Series_1 = require("./controllers/Series");
const User_1 = require("./controllers/User");
const routes = (router) => {
    router.get("/api/books", Book_1.getBooks);
    router.get("/api/books/vols-1", Book_1.getVolsOne);
    router.get("/api/books/recent", Book_1.getRecentVols);
    router.get("/api/books/highest-ranked", Book_1.getHighestRanked);
    router.get("/api/books/highest-ranked/month", Book_1.getHighestRankedMonthly);
    router.get("/api/books/recent-mangas", Book_1.getRecentMangas);
    router.get("/api/books/recent-novels", Book_1.getRecentNovels);
    router.get("/api/books/oldest", Book_1.getOldestVols);
    router.get("/api/books/mangas", Book_1.getMangas);
    router.get("/api/books/light-novels", Book_1.getNovels);
    router.get("/api/books/mangas/recent", Book_1.getRecentMangas);
    router.get("/api/books/light-novels/recent", Book_1.getRecentNovels);
    router.get("/api/books/:id", Book_1.getBook);
    // Genre related routes
    router.get("/api/genres", Genre_1.getGenres);
    router.get("/api/genres/:id/data", Genre_1.getGenreData);
    router.get("/api/genres/:id", Genre_1.getGenreBooks);
    router.get("/api/genres/:id/recent", Genre_1.getRecentGenreBooks);
    // Publisher related routes
    router.get("/api/publishers", Publisher_1.getPublishers);
    router.get("/api/publishers/:id/data", Publisher_1.getPublisherData);
    router.get("/api/publishers/:id", Publisher_1.getPublisherBooks);
    router.get("/api/publishers/:id/recent", Publisher_1.getRecentPublisherBooks);
    // Series related routes
    router.post("/api/series/create", Series_1.createSeries);
    router.get("/api/series", Series_1.getSeries);
    router.get("/api/series/:id", Series_1.getSeriesBooks);
    // Deal related routes
    router.get("/api/deals", Deals_1.getDeals);
    router.post("/api/deals/create", Deals_1.createDeals);
    router.get("/api/deals/free", Deals_1.getFreeBooks);
    router.get("/api/deals/coin-back", Deals_1.getCoinBackBooks);
    router.get("/api/deals/discount", Deals_1.getDiscountedBooks);
    // Auth related routes
    router.post("/api/register", User_1.Register);
    router.post("/api/login", User_1.Login);
    router.get("/api/user", User_1.getAuthUser);
    router.post("/api/refresh", User_1.Refresh);
    router.post("/api/logout", User_1.Logout);
    // router.post("/api/two_factor", TwoFactor)
    // router.post("/api/forgot", ForgotPassword)
    // router.post("/api/reset", ResetPassword)
};
exports.routes = routes;
