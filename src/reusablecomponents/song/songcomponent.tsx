import type Song from "../../models/song";
import AudioWidget from "./audiowidget";
import VideoWidget from "./videowidget";
import { Box, Button, Icon, Paper, Typography } from "@mui/material";
import ThumbUpOffAlt from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import './song.css';
import { useState } from "react";
import { updateUpvotes } from "../../stores/slices/songdataslice";
import { useAppDispatch } from "../../hooks/hooks";

export default function SongComponent(song: Song) {
    const [liked, setLiked] = useState(false);
    const dispatch = useAppDispatch();

    function handleLike() {
        if (!liked) {
            dispatch(updateUpvotes(
                {
                    id: song.id,
                    upvotes: song.upvotes + 1
                }
            ));
        }
        else {
            dispatch(updateUpvotes(
                {
                    id: song.id,
                    upvotes: song.upvotes - 1
                }
            ));
        }
        setLiked(!liked);
    }

    return (
        <Paper className="songcomponent">
            <div className="text">
                <Typography variant="h4">{song.name}</Typography>
                <Typography variant="h5">{song.artist}</Typography>
            </div>
            <div>
                {song.video !== undefined && song.video !== '' ?
                    (<VideoWidget id={song.id} name={song.name} artist={song.artist} upvotes={song.upvotes}
                        video={song.video}></VideoWidget>)
                    :
                    (<AudioWidget id={song.id} name={song.name} artist={song.artist} upvotes={song.upvotes}
                        image={song.image} sound={song.sound}></AudioWidget>)}
            </div>

            <div className="text">
                <Button onClick={handleLike}>
                    {
                        liked === false ?
                            <>
                                <ThumbUpOffAlt></ThumbUpOffAlt>
                                <Typography className="upvotes-text">{song.upvotes}</Typography>
                            </>
                            :
                            <>
                                <ThumbUpAlt></ThumbUpAlt>
                                <Typography className="upvotes-text">{song.upvotes}</Typography>
                            </>
                    }
                </Button>
                {/* <Typography>Upvotes: {song.upvotes}</Typography> */}
            </div>

        </Paper>
    );
}