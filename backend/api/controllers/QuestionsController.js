/**
 * QuestionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const uuid = require('uuid-random');


module.exports = {
  
  //add questions
  addQuestion : async(req,res)=>{
    try {
        let topicId = req.params.id;
        let id = uuid()
        let {question ,questionType, options , answer } = req.body;
        let topic = await Topic.find({where :{id:topicId , isDeleted:false},limit:1});
        if(!topic|| topic.length === 0){
          return res.status(404).json({
            message:'topic not found'
          });
        }else {
          let addQue = await Questions.create({
            id:id,
            topic:topicId,
            question,
            questionType,
            options,
            answer
          }).fetch();
          return res.status(200).json({
            question:addQue,
            message:'question added successfully'
          });
        }
      } catch (error) {
        console.log(error);
        return res.serverError(error);
      }
  },
  
  //List all question by topic
  listQueByTopic : async(req,res)=>{
    let topicId = req.params.id;
    // const limit = 1;
    // let {page} = req.query;
    // if(page == undefined){
    //   page = 1;
    // }
    // let skip = (page - 1) * limit
    // let topic = await Topic.find({id:topicId , isDeleted:false}).populate('question',{limit:limit , skip:skip})

    let topic = await Topic.find({id : topicId , isDeleted:false}).populate('question')
    if(!topic){
      return res.status(404).json({
        message :'topic not found'
      });
    }
      return res.status(200).json({
        message :'quesions',
        // totalQuestions: topic[0].question.length,
        Questions : topic

      })
    
  },

  //listAll 
  listQue :async(req,res)=>{
    let findAll = await Questions.find().populateAll()
    return res.status(200).json({
      all : findAll
    })
  }

};
    


