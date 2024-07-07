import {PlayList} from "./PlayLists";
import Slider from "./Slider";
import {AlbumList} from "./AlbumList";
import {Artists} from "./Artists/Artists";
import SongList from "./SongList/SongList";
import AlbumList1 from "./AlbumList/AlbumList1";

export function AllList() {
    return (
        <>
            <div style={{padding: '0px 24px'}}>
                <Slider/>
                <AlbumList1/>
                <SongList/>
                {/*<PlayList/>*/}
                {/*<AlbumList/>*/}
                <Artists/>
            </div>
        </>
    )
}
