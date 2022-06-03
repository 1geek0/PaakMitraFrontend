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
import {FaLock, FaUserAlt} from 'react-icons/fa'
import PaakMitraService from "../../services/paak_mitra.service";
import {SetStateAction, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import {useNavigate} from "raviger";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login: React.FC = function () {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  
  const navigate = useNavigate()
  
  return (
    <AuthContext.Consumer>
      {({accessToken, setAccessToken})=>(<Flex
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
            if (email.trim().length > 1 || password.trim().length > 1) {
              const mToken = await PaakMitraService.getInstance().login(email, password)
              if (!!mToken)
                setAccessToken(mToken)
              console.log('Token', mToken)
              navigate('/')
            } else {
              alert('Please fill fields corectly')
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
                  <Input type={'email'} placeholder={'Email'} onChange={(e) => setEmail(e.target.value)}/>
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents={'none'}><CFaLock color={'gray.300'}/></InputLeftElement>
                  <Input type={'password'} placeholder={'Password'} onChange={(e) => setPassword(e.target.value)}/>
                </InputGroup>
                <Button borderRadius={4} type={'submit'} variant={'solid'} colorScheme={'teal'}
                        width={'full'}>Login</Button>
              </FormControl>
            </Stack>
          </form>
          <button onClick={()=>navigate('/register')}>Register</button>
        </Box>
      </Flex>)}
    </AuthContext.Consumer>
  )
}
export default Login