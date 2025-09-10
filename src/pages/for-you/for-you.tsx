
import { ThemeProvider } from '@emotion/react';
import './for-you.css'
import { darkTheme } from '../../themes/themes';
import { Box } from '@mui/material';
import Navbar from '../../reusablecomponents/navbar';
import VerticalCarousel from '../../reusablecomponents/carousel/verticalcarousel';
import { useSelector } from 'react-redux';
import { selectAllSongs } from '../../stores/slices/songdataslice';
import { useAppDispatch } from '../../hooks/hooks';
import { useEffect, useState } from 'react';
import SongComponent from '../../reusablecomponents/song/songcomponent';
import type { EmblaOptionsType } from 'embla-carousel';
import { fetchSongs } from '../../stores/thunks/songthunks';

export default function ForYou() {
    const [status, setStatus] = useState('init');
    const songs = useSelector(selectAllSongs);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchSongs());
    }, [])

    const OPTIONS: EmblaOptionsType = { axis: 'y' };
    const SLIDES: React.ReactElement[] = songs.map((s) => {
        return <SongComponent {...s}></SongComponent>;
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Box className="for-you">
                <Navbar></Navbar>
                <div className="song-list">
                    <VerticalCarousel slides={SLIDES} options={OPTIONS}></VerticalCarousel>
                </div>
            </Box>
        </ThemeProvider>
    );
}