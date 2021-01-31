import styled from "styled-components";
import { Vertical } from "../container";

export const PageLayout = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  max-height: calc(100% - 80px);

  &:before {
    background-color: #CCCCCC;
    content: "";
    display: flex;
    flex: 1 1 auto;
  }

  &:after {
    content: "";
    display: flex;
    flex: 1 1 auto;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  max-width: 1200px;
  width: 100%;
  overflow: hidden;
`;

export const PageContent = styled(Vertical)`
  padding: 32px;
  height: 100%;
  width: 100%;
  background-color: #F2F2F2;
`;