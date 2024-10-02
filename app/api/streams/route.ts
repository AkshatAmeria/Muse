import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
//@ts-ignore
import youtubesearchapi from "youtube-search-api";
import { Stream } from "stream";

const YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const CreateStreamSchema = z.object({
    creatorId:z.string(),
    url:z.string()
})

export async function POST(req:NextRequest) {

    try {
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = data.url.match(YT_REGEX);
        if(!isYt){
            return NextResponse.json({
                message:"Wrong url"
             },{
                status: 411
             }) 
        }
        const extractedId = data.url.split("?v=")[1];

const res = await youtubesearchapi.GetVideoDetails(extractedId);
console.log(res.title);
console.log(res.thumbnail.thumbnails);
console.log(JSON.stringify(res.thumbnail.thumbnails));
const thumbnails = res.thumbnail.thumbnails;
thumbnails.sort((a:{width:number},b:{width:number}) => a.width < b.width ? -1 :1 );
       const stream = await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url:data.url,
                extractedId,
                type:"Youtube",
                title: res.title ?? "NOT FOUND",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? "https://imgs.search.brave.com/t9beKKht1bVwMxCFWwEXvMuWhM8GSpuZC9zvUgprheQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aG9zdGluZ2VyLmNv/bS90dXRvcmlhbHMv/d3AtY29udGVudC91/cGxvYWRzL3NpdGVz/LzIvMjAxOC8wNi9o/b3ctdG8tZml4LWVy/cm9yLTQwNC0xLndl/YnA" ,
                bigImg: thumbnails[thumbnails.length -1].url ?? "https://imgs.search.brave.com/t9beKKht1bVwMxCFWwEXvMuWhM8GSpuZC9zvUgprheQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aG9zdGluZ2VyLmNv/bS90dXRvcmlhbHMv/d3AtY29udGVudC91/cGxvYWRzL3NpdGVz/LzIvMjAxOC8wNi9o/b3ctdG8tZml4LWVy/cm9yLTQwNC0xLndl/YnA"
            }
      
        });

        return NextResponse.json({
            message:"Added stream",
            id:stream.id
        })
    } catch (error) {
        console.log(error);
     return NextResponse.json({
        message:"Error while adding a stream"
     },{
        status: 411
     })   
    }

}


export async function  GET(req:NextRequest) {

 const creatorId = req.nextUrl.searchParams.get("creatorId");
 const streams = await prismaClient.stream.findMany({
    where:{
        userId: creatorId ?? ""
    }
 })
    return NextResponse.json({
        streams
    })
}