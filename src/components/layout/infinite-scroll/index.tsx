import { useEffect, useRef } from "react";
import styled from "styled-components";

import { CardList } from "../card"
import { Horizontal } from "../container";
import { Spinner } from "../loading";

const SpinnerContainer = styled(Horizontal)`
  justify-content: center;
  width: 100%;
`;

type InfiniteScrollType = {
  loadMore: () => void;
  isLoadingMore: boolean;
  contentChanged: boolean;
};

const InfiniteScroll : React.FC<InfiniteScrollType> = ({ children, loadMore, isLoadingMore, contentChanged }) => {
  const cardContainer = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (cardContainer.current === null) return;

    const currentScroll = cardContainer.current.scrollTop;
    const maxScrollHeight = cardContainer.current.scrollHeight;

    if (currentScroll >= maxScrollHeight / 4) {
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

  // useEffect(() => {
  //   if (!previousChildren.current || children.length <= previousChildren.current.length ) {
  //     console.log("content changed, should scroll")
  //     previousChildren.current = children;
  //     cardContainer.current.scrollTop = 0;
  //   }
  // }, [children]);

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