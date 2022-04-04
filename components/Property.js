import React from "react";
import Link from "next/link";
import Image from "next/image";
import millify from "millify";
import { Flex, Box, Text, Avatar } from "@chakra-ui/react";
import remi from "../assets/atanda remilekun.jpg";
import { GoVerified } from "react-icons/go";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => {
  return (
    <Link href={`/property/${externalID}`} passHref>
      <Box>
        <Flex
          flexDirection="column"
          w="100%"
          p="4"
          paddingTop="0"
          justifyContent="center"
          cursor="pointer"
          marginBottom="3"
        >
          <Box>
            <Image
              src={coverPhoto ? coverPhoto.url : remi}
              alt="house"
              width={370}
              height={270}
              quality={100}
              placeholder="blur"
              blurDataURL={coverPhoto.url}
            />
          </Box>
          <Box w="full">
            <Flex
              paddingTop="2"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                <Box color="green.400">{isVerified && <GoVerified />}</Box>
                <Text marginLeft="2" fontWeight="bold">
                  AED {millify(price)}
                  {rentFrequency && `/${rentFrequency}`}
                </Text>
              </Flex>
              <Box>
                <Avatar size="sm" src={agency?.logo?.url} />
              </Box>
            </Flex>
            <Flex
              color="blue.400"
              w="250px"
              justifyContent="space-between"
              p="1"
              alignItems="center"
            >
              {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
              <BsGridFill />
            </Flex>
            <Text fontSize="md">
              {title.length > 30 ? `${title.substring(0, 30)}...` : title}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Link>
  );
};

export default Property;
