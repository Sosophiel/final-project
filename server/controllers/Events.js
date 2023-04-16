import Events from '../models/EventsModel.js';



export const getEvents = async (req,res) => {
    try {
        console.log('getEvent', req.params)
        const events = await Events.findAll({
            where: {
              user_id: req.params.userId
            }
          })

        return res.status(200).json(events)
    } catch (error) {
        return res.status(404).json({msg:error})
    }
}


export const deleteEvent = async (req,res) => {
    try {
        console.log('deleteEvent', req.params)
        const event = await Events.findByPk(req.params.eventId)

        if(event) {
            await event.destroy()
            return res.status(200).json({msg:'Event deleted successfully'})
        }
        else {
            return res.status(404).json({msg:'Event not found'})
        }


        
    } catch (error) {
        return res.status(400).json({msg:error})
    }
}

export const createEvent = async (req,res) => {

    try{
        console.log('createEvent', req.body)
        const event = await Events.create(req.body)
        res.status(200).json({event_id : event.event_id, msg:'Event Successfully created!'})
    }
    catch(e) {
        res.status(400).json({msg:e})
    }
}

export const updateEvent = async (req,res) => {

    try{
        console.log('updateEvent', req.body)
        const {body} = req

        const event = await Events.findByPk(req.params.eventId)
        if(event) {
            event.set({
                title: body.title,
                startDate : body.startDate,
                endDate: body.endDate,
            })
            event.save()
            res.status(200).json({event_id : event.event_id, msg:'Event Successfully modified!'})
        }
        
    }
    catch(e) {
        res.status(400).json({msg:e})
    }
}





