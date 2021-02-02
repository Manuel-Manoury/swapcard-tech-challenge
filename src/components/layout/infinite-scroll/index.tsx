import { useEffect, useRef } from "react";
import styled from "styled-components";

import { CardList } from "../card"
import { Horizontal } from "../container";
import { Spinner } from "../loading";

const SpinnerContainer = styled(Horizontal)`
  justify-content: center;
  width: 100%;
`;

const SCROLL_FACTOR_FOR_LOADMORE = 0.3;

type InfiniteScrollType = {
  loadMore: () => void;
  isLoadingMore: boolean;
};

const InfiniteScroll : React.FC<InfiniteScrollType> = ({ children, loadMore, isLoadingMore }) => {
  const cardContainer = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (cardContainer.current === null) return;

    const currentScroll = cardContainer.current.scrollTop;
    const maxScrollHeight = cardContainer.current.scrollHeight;

    if (currentScroll >= maxScrollHeight * SCROLL_FACTOR_FOR_LOADMORE) {
      window.requestAnimationFrame(() => {
        if (cardContainer.current === null) return;
        
        cardContainer.current.removeEventListener("scroll", handleScroll);
        loadMore();
      });
    }
  };

  useEffect(() => {
    if (children && cardContainer.current) {
      cardContainer.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (cardContainer.current) {
        cardContainer.current.removeEventListener("scroll", handleScroll);
      }
    }
  }, [children]);

  return (
    <CardList ref={cardContainer}>
      {children}
      {isLoadingMore && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </CardList>
  );
};

export default InfiniteScroll;