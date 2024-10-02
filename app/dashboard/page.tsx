"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpCircle, ArrowDownCircle, Plus, Youtube,PlayCircle } from "lucide-react"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";
type Video = {
  id: string
  title: string
  votes: number
  thumbnail: string
}
// interface Video {
//   "id":string,
//   "type":string,
//   "url":string,
//   "extractedId":string,
//   "title":string,
//   "smallImg":string,
//   "bigImg":string,
//   "active":boolean,
//   "userId":string,
//   "upvotes":number,
//   "haveUpvoted":boolean,
//   "thumbnail":string,
//   "votes":number
// }
const REFRESH_INTERVAL_MS = 10*1000;

export default function Component() {
  const [videos, setVideos] = useState<Video[]>([

  ])
  const [newVideoUrl, setNewVideoUrl] = useState("")
  const [previewVideo, setPreviewVideo] = useState<Video | null>(null)

  // const handleVote = (id: string, increment: number) => {
  //   setVideos(videos.map(video => 
  //     video.id === id ? { ...video, votes: video.votes + increment } : video
  //   ).sort((a, b) => b.votes - a.votes))
  // try {
  //   fetch("/api/streams/upvote",{
  //     method:"POST",
  //     body:JSON.stringify({
  //       streamId:id
  //     })
  //   })
  // } catch (error) {
  //   console.log(error)
  // }
  // }

  const UphandleVote = async (id: string, increment: number) => {
    try {
      await fetch("/api/streams/upvote", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ streamId: id })
      });
      setVideos(videos.map(video =>
        video.id === id ? { ...video, votes: video.votes + increment } : video
      ).sort((a, b) => b.votes - a.votes));
    } catch (error) {
      console.log(error);
    }
  };

  const DownhandleVote = async (id: string, increment: number) => {
    try {
      await fetch("/api/streams/downvote", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ streamId: id })
      });
      setVideos(videos.map(video =>
        video.id === id ? { ...video, votes: video.votes + increment } : video
      ).sort((a, b) => b.votes - a.votes));
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (previewVideo) {
      setVideos([...videos, { ...previewVideo, votes: 0 }].sort((a, b) => b.votes - a.votes))
      setNewVideoUrl("")
      setPreviewVideo(null)
    }
  
  }
  

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (previewVideo) {
  //     try {
  //       const response = await fetch("/api/streams", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           creatorId: "creatorId",
  //           url: newVideoUrl,
  //         })
  //       })
  //       const data = await response.json()
  //       if (data.success) {
  //         setVideos([...videos, { ...previewVideo, votes: 0 }].sort((a, b) => b.votes - a.votes))
  //         setNewVideoUrl("")
  //         setPreviewVideo(null)
  //       } else {
  //         console.error("Error adding video to database:", data.error)
  //       }
  //     } catch (error) {
  //       console.error("Error adding video to database:", error)
  //     }
  //   }
  // }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (previewVideo) {
  //     try {
  //       const headers = {
  //         'Content-Type': 'application/json',
  //         'Content-Length': JSON.stringify({ creatorId: "creatorId", url: newVideoUrl }).length,
  //       };
  
  //       const response = await fetch("/api/streams", {
  //         method: "POST",
  //         // headers,
  //         body: JSON.stringify({ creatorId: "creatorId", url: newVideoUrl }),
  //       })
  
  //       const data = await response.json()
  //       if (data.success) {
  //         setVideos([...videos, { ...previewVideo, votes: 0 }].sort((a, b) => b.votes - a.votes))
  //         setNewVideoUrl("")
  //         setPreviewVideo(null)
  //       } else {
  //         console.error("Error adding video to database:", data.error)
  //       }
  //     } catch (error) {
  //       console.error("Error adding video to database:", error)
  //     }
  //   }
  // }

  const handlePlayNow = (id: string) => {
    // Simulate payment process
    toast.success('Payment of $1 successful!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    }
  
  )
    // Move the selected video to the top of the queue
    const selectedVideo = videos.find(video => video.id === id)
    if (selectedVideo) {
      const newVideos = [selectedVideo, ...videos.filter(video => video.id !== id)]
      setVideos(newVideos)
    }
  }

async function refreshStream(){
const res = await fetch(`/api/streams/my`,{
  credentials:"include"
});
const data = await res.json();

console.log(data);
setVideos(data.streams)
}
   useEffect(() =>{
    refreshStream();
    const interval = setInterval(() => {

    },REFRESH_INTERVAL_MS)
  })

// async function refreshStream() { 
//   const res = await fetch(`/api/streams/my`, 
//     { credentials: "include", }); 
//     const data = await res.json(); 
//     setVideos(data);
//   console.log(data);
//   } 
    
//     useEffect(() => { refreshStream(); const interval = setInterval(() => { 
//       refreshStream(); }, REFRESH_INTERVAL_MS); 
//       return () => clearInterval(interval); });

  
  useEffect(() => {
    const fetchVideoInfo = async () => {
      if (newVideoUrl) {
        const videoId = extractVideoId(newVideoUrl)
        if (videoId) {
          // In a real application, you would fetch this data from the YouTube API
          // For this example, we'll simulate it with placeholder data
          setPreviewVideo({
            id: videoId,
            title: `Video ${videoId}`,
            votes: 0,
            thumbnail: `https://img.youtube.com/vi/${videoId}/default.jpg`
          })
        }
      } else {
        setPreviewVideo(null)
      }
    }
    fetchVideoInfo()
  }, [newVideoUrl])

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-800 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="flex items-center space-x-2">
          <Youtube className="w-8 h-8 text-red-500" />
          <h1 className="text-2xl font-bold">YouTube Voting Queue</h1>
        </div>
      </header>
      <main className="container mx-auto p-4 space-y-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-300">Currently Playing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videos[0]?.id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div>
            <h3 className="mt-4 text-xl font-semibold text-indigo-300">{videos[0]?.title}</h3>
            <Button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "YouTube Voting Queue",
                  url: window.location.href,
                  text: "Check out this awesome YouTube voting queue!",
                })
                  .then(() => console.log("Shared successfully"))
                  .catch((error) => console.error("Error sharing:", error));
              } else {
                console.log("Sharing not supported");
              }
            }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
          >
            Share
          </Button>

            </div>
            
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-300">Add a Video</CardTitle>
            
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Paste YouTube URL here"
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              {previewVideo && (
                <div className="flex items-center space-x-4">
                  <img src={previewVideo.thumbnail} alt={previewVideo.title} className="w-24 h-18 object-cover rounded" />
                  <div>
                    <h4 className="font-semibold text-indigo-300">{previewVideo.title}</h4>
                  </div>
                </div>
              )}
              <Button onClick={() => {
                fetch("/api/streams",{
                  method:"POST",
                  body:JSON.stringify({
                    creatorId:"creatorId",
                    url: newVideoUrl
                  })
                })
              }} type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={!previewVideo}>
                <Plus className="w-4 h-4 mr-2" />
                Add to Queue
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-300">Video Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {videos.slice(1).map((video) => (
                <li key={video.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img src={video.thumbnail} alt={video.title} className="w-24 h-18 object-cover rounded" />
                    <div>
                      <h3 className="font-semibold text-indigo-300">{video.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button onClick={() => UphandleVote(video.id, 1)} size="sm" variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-800">
                      <ArrowUpCircle className="w-4 h-4 mr-1" />
                      <span className="sr-only">Upvote</span>
                    </Button>
                    <span className="text-lg font-bold min-w-[2ch] text-center text-purple-300">{video.votes}</span>
                    <Button onClick={() => DownhandleVote(video.id, -1)} size="sm" variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-800">
                      <ArrowDownCircle className="w-4 h-4 mr-1" />
                      <span className="sr-only">Downvote</span>
                    </Button>
                    <Button onClick={() => handlePlayNow(video.id)} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <PlayCircle className="w-4 h-4 mr-1" />
                      Play Now ($1)
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
