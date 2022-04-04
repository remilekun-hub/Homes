import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import Property from "../components/Property";
import { baseUrl, fetchApi } from "../Service/fetchApi";

const Banner = ({
  purpose,
  title1,
  title2,
  decs1,
  desc2,
  linkName,
  buttontext,
  imageUrl,
}) => (
  <Flex wrap="wrap" justifyContent={"center"} alignItems="center" m="7">
    <Image src={imageUrl} alt="house" width={500} height={300} />
    <Box p="3">
      <Text color={"grey.500"} fontSize="sm" fontWeight={"medium"}>
        {purpose}
      </Text>
      <Text fontSize={"2xl"} fontWeight="bold">
        {title1} <br /> {title2}
      </Text>
      <Text
        fontSize={"md"}
        color="grey.700"
        paddingTop="3"
        paddingBottom="3"
        fontWeight="bold"
      >
        {decs1} <br /> {desc2}
      </Text>
      <Button color="black" fontSize="md">
        <Link href={linkName}>{buttontext}</Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({ PropertiesForSale, PropertiesForRent }) {
  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        decs1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttontext="Explore Renting"
        linkName="/Search?purpose=For-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {PropertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>

      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        decs1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttontext="Explore Buying"
        linkName="/Search?purpose=For-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {PropertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

export const getStaticProps = async () => {
  const PropertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const PropertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      PropertiesForSale: PropertyForSale?.hits,
      PropertiesForRent: PropertyForRent?.hits,
    },
  };
};
