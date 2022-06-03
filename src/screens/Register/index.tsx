import React, {useState} from "react";
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack
} from "@chakra-ui/react";
import PaakMitraService from "../../services/paak_mitra.service";
import AuthContext from "../../contexts/AuthContext";
import {FaLock, FaUserAlt} from "react-icons/fa";
import {toast, ToastContainer} from "react-toastify";
import {navigate} from "raviger";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register: React.FC = function () {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  return (
    <AuthContext.Consumer>
      {({accessToken, setAccessToken}) => (<Flex
        flexDirection={'column'}
        width={"100wh"}
        height={"100vh"}
        backgroundColor={"gray.100"}
        justifyContent={"center"}
        alignItems={"center"}>
        <Avatar bg={"teal.500"}/>
        
        <Heading>Welcome to Paak Mitra!</Heading>
        <Box minW={{base: "90%", md: '468px'}}>
          <form onSubmit={async (e) => {
            e.preventDefault()
            if (email.trim().length > 1 || password.trim().length > 1 || name.trim().length > 1) {
              const mToken = await PaakMitraService.getInstance().register(email, password, name)
              if (!!mToken)
                setAccessToken(mToken)
              console.log('Token', mToken)
              navigate('/')
            } else {
              alert("Please fill fields correctly")
            }
          }}>
            <Stack
              spacing={4}
              p={"1rem"}
              backgroundColor={'whiteAlpha.900'}
              boxShadow={'md'}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents={'none'}><CFaUserAlt color={'gray.300'}/></InputLeftElement>
                  <Input type={'text'} placeholder={'Name'} onChange={(e) => setName(e.target.value)}/>
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents={'none'}><CFaUserAlt color={'gray.300'}/></InputLeftElement>
                  <Input type={'email'} placeholder={'Email'} onChange={(e) => setEmail(e.target.value)}/>
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents={'none'}><CFaLock color={'gray.300'}/></InputLeftElement>
                  <Input type={'password'} placeholder={'Password'} onChange={(e) => setPassword(e.target.value)}/>
                </InputGroup>
                <Button borderRadius={4} type={'submit'} variant={'solid'} colorScheme={'teal'}
                        width={'full'}>Register</Button>
              </FormControl>
            </Stack>
          </form>
          <button onClick={()=> navigate('/')}>Login</button>
        </Box>
      </Flex>)}
    </AuthContext.Consumer>
  )
}

export default Register