const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new Schema({
_id:mongoose.Types.ObjectId,
title:String,
description:String,
content:String,
added:Date
});
module.exports = mongoose.model('News', newsSchema)