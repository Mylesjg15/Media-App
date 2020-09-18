const express = require('express')
const router = express.Router()
const News = require('../models/News')
const auth = require('../middlewares/authentication')

router.post('/', auth,  (req, res) => {
    const { title, description, category, trending, url, urlToImage, publishedAt } = req.body
    const news = new News()

    news.title = title
    news.description = description
    news.category = category
    news.trending = trending
    news.url = url
    news.urlToImage = urlToImage
    news.publishedAt = new Date(publishedAt)

    news.save()
        .then( newNews => {
            res.json(newNews)
        })
        .catch( err => {
            res.status(500).json(err)
        })
})

router.delete('/:id',auth, (req,res) => {
    const {id} = req.params
    News.deleteOne({_id:id})
        .then(news => res.json(news))
        .catch(err => res.status(500).json({
            "status": "Error",
            "message": err
        }))
})

router.patch('/:id', auth, (req, res)=>{
    const {id} = req.params.id
    const updateInfo = req.body
    News.update({_id: req.params.id}, updateInfo)
    .then(news=> res.json(news))
    .catch(err =>{
        res.status(500).json
    })
})

router.get('/latestNews', (req,res) => {
    News.find().sort({publishedAt: -1}).limit(3)
    .then(latestNews => res.json(latestNews))
    .catch(err => res.status(500).json(err))
})

router.get('/sportsNews', (req,res) => {
    News.find({category: 'Sports'}).sort({publishedAt: -1})
    .then(sportsNews => res.json(sportsNews))
    .catch(err => res.status(500).json(err))
})

router.get('/trendingNews', (req,res) => {
    News.find({trending: 'Yes'}).sort({publishedAt: -1}).limit(3)
    .then(trendingNews => res.json(trendingNews))
    .catch(err => res.status(500).json(err))
})

router.get('/', (req, res) => {
    News.find()
        .then(news => {
            res.json(news)
        })
        .catch(err => {
            res.status(500).json({ msg: err })
        })
})

module.exports = router