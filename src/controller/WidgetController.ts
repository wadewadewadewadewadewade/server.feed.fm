import {getRepository} from "typeorm"
import {NextFunction, Request, Response} from "express"
import { Widget } from "../entity/Widget"

export class WidgetController {

    private widgetRepository = getRepository(Widget);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.widgetRepository.find()
    }

    async tag(request: Request, response: Response, next: NextFunction) {
        //return this.widgetRepository.findOne(request.params.id)
        const { tag, offset, max } = request.params
        return new Promise<any>((resolve, reject) => {
            this.widgetRepository.query('call findWidgetsWithTag(' + ['\'' + tag + '\'', offset, max].join() + ')')
                .then(data => {
                    if (data.length > 0) {
                        data[0].map(n => n.tags = n.tags.split(','))
                        data[0].map(n => n.dongles = n.dongles.split(','))
                        resolve(data[0])
                    } else {
                        resolve(data)
                    }
                }).catch(err => reject(err))
        })
    }

}