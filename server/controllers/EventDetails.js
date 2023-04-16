import EventDetails from '../models/EventDetailsModel.js';



export const getEventDetails = async (req,res) => {
    try {
        console.log('getEventDetails', req.params)
        const events = await EventDetails.findAll({
            where: {
              //user_id: req.params.userId,
              event_id: req.params.eventId
            }
          })

        return res.status(200).json(events)
    } catch (error) {
        return res.status(404).json({msg:error})
    }
}


export const deleteEventDetail = async (req,res) => {
    try {
        console.log('deleteEvent', req.params)
        const eventDetail = await EventDetails.findByPk(req.params.eventDetailId)

        if(eventDetail) {
            await eventDetail.destroy()
            return res.status(200).json({msg:'Event detail deleted successfully'})
        }
        else {
            return res.status(404).json({msg:'Event detail not found'})
        }


        
    } catch (error) {
        return res.status(400).json({msg:error})
    }
}

export const createEventDetail = async (req,res) => {

    try{
        console.log('createEvent', req.body)
        const event = await EventDetails.create(req.body)
        res.status(200).json({event_id : event.event_id, msg:'Event detail successfully created!'})
    }
    catch(error) {
        res.status(400).json({msg:error})
    }
}

export const updateEventDetail = async (req,res) => {

    try{
        console.log('updateEvent', req.body)
        const {body} = req

        const eventDetail = await EventDetails.findByPk(req.params.eventDetailId)
        if(eventDetail) {
            eventDetail.set({
                title: body.title,
                budget: body.budget,
                cost: body.cost,
                deposit: body.deposit,
                supplierName: body.supplierName,
                supplierPhone: body.supplierPhone,
                supplierEmail: body.supplierEmail
            })
            eventDetail.save()
            res.status(200).json({msg:'Event detail successfully modified!'})
        }
        
    }
    catch(e) {
        res.status(400).json({msg:e})
    }
}





