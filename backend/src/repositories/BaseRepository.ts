import mongoose, { Model, Document } from 'mongoose';

export class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async findOne(filter: mongoose.FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter);
  }

  async find(filter: mongoose.FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter);
  }

  async updateById(id: string, update: mongoose.UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true, runValidators: true });
  }

  async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  async count(filter: mongoose.FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }
}
