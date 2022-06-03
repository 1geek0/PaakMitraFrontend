import React, {useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import {Box, Button, Flex, FormControl, Input, InputGroup, InputLeftElement, Stack} from "@chakra-ui/react";
import {Formik} from "formik";
import PaakMitraService from "../../services/paak_mitra.service";
import RecipeCard from "../../components/RecipeCard";

const Home: React.FC = function () {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState<{links: [], recipe: {
      image: string,
      url: string,
      label: string,
      calories: string,
      totalTime: string
    }}[]>([])
  
  return (
    <AuthContext.Consumer>{
      ({accessToken, setAccessToken}) => (
        <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <Box minW={{base: '90%', md: '468px'}}>
            <Formik initialValues={{query: ''}} onSubmit={async (values, {setSubmitting}) => {
              const recipeResponse = await PaakMitraService.getInstance().findRecipes(query, accessToken)
              setRecipes(recipeResponse.hits)
            }}>
              {({values, errors, touched, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                  <Stack
                    spacing={4}
                    p={"1rem"}
                    backgroundColor={'whiteAlpha.900'}
                    boxShadow={'md'}>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement pointerEvents={'none'}></InputLeftElement>
                        <Input type={'text'} placeholder={'Search By ingredients, calories, name, etc.'}
                               onChange={(e) => setQuery(e.target.value)}/>
                      </InputGroup>
                      <Button borderRadius={4} type={'submit'} variant={'solid'} colorScheme={'teal'}
                              width={'full'}>Search Recipes</Button>
                    </FormControl>
                  </Stack>
                </form>
              )}
            </Formik>
            {recipes.map(recipe => {
              return (
                <RecipeCard key={recipe.recipe.url} link={recipe.recipe.url} timeToCook={parseFloat(recipe.recipe.totalTime)} image={recipe.recipe.image} calories={parseFloat(recipe.recipe.calories)} name={recipe.recipe.label}/>
              )
            })}
          </Box>
        </Flex>
      )
    }
    </AuthContext.Consumer>
  )
}

export default Home