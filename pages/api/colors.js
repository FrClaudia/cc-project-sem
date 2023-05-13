// pages/api/colors.js
import {sendMethodNotAllowed, sendOk,} from '@/js/utils/apiMethods.js';
import {getCollection} from "@/js/utils/functions";
import {ObjectId,} from 'mongodb';
const COLLECTION_NAME = 'colors';

const getColors = async () => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.find({}).toArray();
}

const getColor = async (id) => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.findOne({_id: new ObjectId(id)});
}

const postColor = async (color) => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.insertOne(color);
}

const putColor = async (color) => {
	const collection = await getCollection(COLLECTION_NAME);
	const id = color._id;
	delete color._id;
	return collection.updateOne({_id: new ObjectId(id)}, {$set: color});
}

const deleteColor = async (id) => {
	console.log(id);
	const collection = await getCollection(COLLECTION_NAME);
	console.log(id);
	return collection.deleteOne({_id: new ObjectId(id)});
}

export default async function handler(req, res) {

	const isAllowedMethod = req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE';
	if(!isAllowedMethod) {
		return sendMethodNotAllowed(res);
	}

	if(req.method === 'GET' && req.query.id) {
		const id = req.query.id;
		const color = await getColor(id);
		return sendOk(res, color);
	}
	else if(req.method === 'GET') {
		const colors = await getColors();
		return sendOk(res, colors);
	}
	else if(req.method === 'POST') {
		const color = req.body;
		const result = await postColor(color);
		return sendOk(res, result);
	}
	else if(req.method === 'PUT') {
		const color = req.body;
		const result = await putColor(color);
		return sendOk(res, result);
	}
	else if(req.method === 'DELETE') {
		const id = req.query.id;
		const result = await deleteColor(id);
		return sendOk(res, result);
	}
}