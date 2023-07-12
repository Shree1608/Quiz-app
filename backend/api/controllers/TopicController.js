/**
 * TopicController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const uuid = require('uuid-random');
module.exports = {
  

   //add topic by admin
  addTopic: async (req, res) => {
    let {title} =  req.body;
    let id = uuid()
    let topic = await Topic.findOne({where :{title:title ,isDeleted:false}});
    if(topic){
      return res.status(409).json({
        message:'title name already exists'
      });
    }
    topic = await Topic.create({
      id:id,
      title:title,
    }).fetch();
    return res.status(200).json({
      topic:topic,
      message: 'topic added',
    });
  },

  //edit topic by admin
  editTopic : async(req,res)=>{
    let titleid = req.params.id;
    let title = req.body.title;
    let topic = await Topic.findOne({id:titleid ,isDeleted:false});
    if(!topic){
      return res.status(404).json({
        message:'topic not found'
      });
    }else{
      topic = await Topic.updateOne({id:titleid}).set({title:title}).fetch();
      return res.status(200).json({
        message:'topic updated successfully',
        topic:topic
      });
    }
  },

  //delete topic by admin
  deleteTopic: async(req,res)=>{
    let titleid = req.params.id;
    let title = await Topic.findOne({id:titleid , isDeleted:false});
    if(!title){
      return res.status(404).json({
        message :'title not found'
      });
    }
    else{
       await Topic.updateOne({id:titleid}).set({isDeleted:true});
      return res.status(200).json({
        message :'title deleted successfully'
      });
    }
  },

  //find One topic
  findOne: async(req,res)=>{
    let topicid = req.params.id;
    let topic = await Topic.findOne({id:topicid , isDeleted:false});
    if(!topic){
      return res.status(404).json({
        message :'topic not found'
      });
    }else{
      return res.status(200).json({
        topic:topic
      });
    }
  },
  //list all
  find:async(req,res)=>{
    let topic = await Topic.find({isDeleted:false});
    return res.status(200).json({
      topics:topic,
      message:'all the topics'
    });
  },

  //count total topics
  countTopics: async function (req, res) {
    try {
      let total = await Topic.count({ isDeleted: false });
      return res.json({
        total: total,
      });
    } catch (error) {
      console.error('Error:', error);
      return res.serverError('An error occurred while counting topics');
    }
  }
    
  
};

