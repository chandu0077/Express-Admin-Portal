"use client"
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { signupForm } from "@/utilis/forms/signupForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(signupForm),

    criteriaMode: "firstError",
    mode: "onChange",
    reValidateMode: "onChange",
  });

  type ISignupForm = yup.InferType<typeof signupForm>;

  const onSubmit = (data: ISignupForm) => {
    axios
      .post("http://localhost:5000/api/user/register", {
        data,
      })
      .then(function (response) {
        router.push("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Flex
      h="100vh"
      justify={"center"}
      alignItems={"center"}
      direction={"column"}
    >
      <Text color="white" fontSize={"4xl"} fontWeight={"semibold"}>
        Signup
      </Text>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" {...register("name")} />
          <Text>{errors?.name?.message}</Text>
          <FormHelperText>We never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" {...register("email")} />
          <Text>{errors?.email?.message}</Text>
          <FormHelperText>We never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password")} />
          <Text>{errors?.password?.message}</Text>
        </FormControl>
        <Button mt="4" textAlign={"center"} type="submit">
          Submit
        </Button>
      </form>
    </Flex>
  );
}
