import styled from "styled-components";

const SectionTitle = styled.h2`
  background-color: #CCCCCC;
  padding: 4px 16px;
`;

const ArtistSection = ({ title, children }) => {
  return (
    <>
      <SectionTitle>
        {title}
      </SectionTitle>
      {children}
    </>
  );
};

export default ArtistSection;