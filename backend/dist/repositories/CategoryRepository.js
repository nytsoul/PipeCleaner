"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Category_1 = require("../models/Category");
class CategoryRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Category_1.Category);
    }
}
exports.CategoryRepository = CategoryRepository;
