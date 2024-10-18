"use client";

import { useRouter } from "next/navigation";

import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/contacts");
  }, []);
  return (
    <Flex
      maxW="1240px"
      mx="auto"
      my="12"
      gap={4}
      justifyContent={"space-between"}
    ></Flex>
  );
}
