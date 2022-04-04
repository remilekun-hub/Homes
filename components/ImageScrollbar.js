import React, { useContext } from "react";
import Image from "next/image";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Box, Flex, Icon } from "@chakra-ui/react";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent={"center"} alignItems={"center"} marginRight="1">
      <Icon
        as={FaArrowAltCircleLeft}
        fontSize="xl"
        cursor="pointer"
        onClick={() => scrollPrev()}
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent={"center"} alignItems={"center"} marginLeft="1">
      <Icon
        as={FaArrowAltCircleRight}
        fontSize="xl"
        cursor="pointer"
        onClick={() => scrollNext()}
      />
    </Flex>
  );
};

function ImageScrollbar({ data }) {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflow: "hidden" }}
    >
      {data.map((item) => (
        <Box
          width="910px"
          height="65vh"
          key={item.id}
          itemID={item.id}
          overflow="hidden"
          p="1"
        >
          <Image
            alt="property"
            placeholder="blur"
            blurDataURL={item.url}
            src={item.url}
            width={910}
            height={500}
          />
        </Box>
      ))}
    </ScrollMenu>
  );
}

export default ImageScrollbar;
