const ArtistAlbumPage = () => {
  return (
    <div>Artist Album Page</div>
  );
};

export default ArtistAlbumPage;

export const getStaticPaths = () => {
  return {
    paths : [],
    fallback: true  
  }
}

export const getStaticProps = ({ params }) => {
  console.log(params);

  return {
    props: { albumId: params.albumId }
  }
}