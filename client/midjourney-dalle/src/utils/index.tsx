import Filesaver from 'file-saver'
import { surpriseMePrompts } from "../constants";

export function getRandomPrompt(prompt: string):string {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPropmt = surpriseMePrompts[randomIndex]

    if (randomPropmt === prompt){
        return getRandomPrompt(prompt)
    }

    return randomPropmt
}

export async function downloadImage( _id:string, photo:string ){
    Filesaver.saveAs(photo, `download ${_id}.jpg`)
}
