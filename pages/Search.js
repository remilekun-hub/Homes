import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../components/SearchFilters";
import remi from "../assets/atanda remilekun.jpg";
import { baseUrl, fetchApi } from "../Service/fetchApi";
import Property from "../components/Property";
import { filterData } from "../util/FilterData";

function Searchs({ properties }) {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderColor="gray.200"
        p="2"
        fontWeight="bold"
        justify="center"
        fomtSize="md"
        alignitems="center"
        onClick={() => setSearchFilters(!searchFilters)}
      >
        <Text>Search Property by filter</Text>
        <Icon w="7" marginLeft="1" marginTop="1" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="xl" p="4" fontWeight="bold">
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap" justifyContent="center">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginTop="5"
          marginBottom="6"
        >
          <Image alt="no result" src={remi} width={400} height={400} />
          <Text fontSize="xl" marginTop="3">
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
}

export default Searchs;

export const getServerSideProps = async ({ query }) => {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
};
