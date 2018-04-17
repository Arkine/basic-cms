import mongoose from 'mongoose';
import express from 'express';
import util from 'util';
import pluralize from 'pluralize';

import { ok, fail } from './helpers';
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();
const promisify = util.promisify;
require('util.promisify').shim();

const MAX_RESULTS = 10;

export default class BaseController {
	constructor(model, key) {
		this.model = model;
		this.modelName = model.modelName.toLowerCase();
		this.key = key;
	}

	async create(data) {
		return await this.model.create(data);
	}

	async read(id) {
		const filter = {
			[this.key]: id
		};

		return await this.model.findOne(filter);
	}

	async update(id, data) {
		const filter = {
			[this.key]: id
		};

		return await this.model
			.findOne(filter)
			.then(modelInstance => {
				for (const attribute in data) {
					if (data.hasOwnProperty(attribute) && attribute !== this.key && attribute !== "_id") {
						modelInstance[attribute] = data[attribute];
					}
				}

				return modelInstance.save();
			})
			.then (modelInstance => {
				return {
					[this.modelName] : modelInstance
				};
			})
	}

	async delete(id) {
		const filter = {
			[this.key]: id
		};

		return await this.model
			.remove(filter)
			.then(() => {
				return {success: true}
			});
	}

	async list() {
		console.log('getting list...');

		const items = await this.model
			.find({})
			.limit(MAX_RESULTS);

		return items;
	}

	route() {
		router.get("/", async (req, res) => {
			const items = await this.list()

			if (items) {
				res.render(`${viewsRoot}/teams`, {
					title: 'Teams',
					items
				})
			}

		});

		router.post("/", (req, res) => {
			this
				.create(req.body)
				.then(ok(res))
				.then(null, fail(res));
		});

		router.get("/:key", (req, res) => {
			this
				.read(req.params.key)
				.then(ok(res))
				.then(null, fail(res));
		});

		router.put("/:key", (req, res) => {
			this
				.update(req.params.key, req.body)
				.then(ok(res))
				.then(null, fail(res));
		});

		router.delete("/:key", (req, res) => {
			this
				.delete(req.params.key)
				.then(ok(res))
				.then(null, fail(res));
		});

		return router;
	}
}