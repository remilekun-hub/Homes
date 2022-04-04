import { GoVerified } from "react-icons/go";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import millify from "millify";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { fetchApi, baseUrl } from "../../Service/fetchApi";
import ImageScrollbar from "../../components/ImageScrollbar";
import { AnimatePresence } from "framer-motion";

function PropertyDetails({
  propertyDetails: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
    agency,
    isVerified,
    externalID,
  },
}) {
  return (
    <AnimatePresence>
      <Box maxWidth="1000px" margin="auto" p="1">
        {photos && <ImageScrollbar data={photos} />}
        <Box w="full" p="4">
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
          <Box marginTop="2">
            <Text fontSize="lg" marginBottom="2" fontWeight="bold">
              {title}
            </Text>
            <Text lineHeight="2" color="gray.600">
              {description}
            </Text>
          </Box>
          <Flex
            flexWrap="wrap"
            textTransform="uppercase"
            justifyContent="space-between"
          >
            <Flex
              justifyContent="space-between"
              w="400px"
              borderBottom="1px"
              borderColor="gray.100"
              p="3"
            >
              <Text>Type</Text>
              <Text fontWeight="bold">{type}</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              w="400px"
              borderBottom="1px"
              borderColor="gray.100"
              p="3"
            >
              <Text>Purpose</Text>
              <Text fontWeight="bold">{purpose}</Text>
            </Flex>
            {furnishingStatus && (
              <Flex
                justifyContent="space-between"
                w="400px"
                borderBottom="1px"
                borderColor="gray.100"
                p="3"
              >
                <Text>Furnishing Status</Text>
                <Text fontWeight="bold">{furnishingStatus}</Text>
              </Flex>
            )}
          </Flex>
          <Box>
            {amenities.length && (
              <Text fontSize="2xl" fontWeight="black" marginTop="5">
                Amenities
              </Text>
            )}
            <Flex flexWrap="wrap">
              {amenities.map((item) =>
                item.amenities.map((amenity) => (
                  <Text
                    key={amenity.text}
                    fontWeight="bold"
                    color="blue.400"
                    fontSize="sm"
                    p="2"
                    bg="gray.200"
                    m="1"
                    borderRadius="5"
                  >
                    {amenity.text}
                  </Text>
                ))
              )}
            </Flex>
          </Box>
        </Box>
      </Box>
    </AnimatePresence>
  );
}

export default PropertyDetails;

export const getServerSideProps = async ({ params: { id } }) => {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  return {
    props: {
      propertyDetails: data,
    },
  };
};
