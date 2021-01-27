const ArtistPage = () => {
  return (
    <div>Artist Page</div>
  );
};

export default ArtistPage;

export const getStaticPaths = () => {
  return {
    paths : [],
    fallback: true  
  }
}

export const getStaticProps = ({ params }) => {
  console.log(params);

  return {
    props: { artistId: params.artistId }
  }
}