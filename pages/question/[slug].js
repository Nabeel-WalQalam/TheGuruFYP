import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Question from "../../components/Question";
import { Spinner, Text, Flex } from "@chakra-ui/react";
import Loader from "../../Loader";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [Allanswer, setAllanswer] = useState(null);
  const [question, setquestion] = useState(null);
  const [isAnswerPost, setisAnswerPost] = useState(false);
  const [FIlterQuestion, setFIlterQuestion] = useState(null);
  // console.log(slug);

  useEffect(() => {
    const getAllQuestion = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_Host_URL}api/getAllQuestion`
        );
        console.log("question", response.data.payload);

        setquestion(response.data.payload.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllQuestion();
  }, []);

  useEffect(() => {
    if (question) {
      const filterData = question.filter((items) => {
        return items._id == slug;
      });
      console.log("filter", filterData);
      setFIlterQuestion(filterData);
    }
  }, [question]);

  useEffect(() => {
    const cancelRequest = axios.CancelToken.source();
    if (slug) {
      // console.log(slug);
      const fetchAnswer = async () => {
        try {
          const responce = await axios
            .post(
              `${process.env.NEXT_PUBLIC_Host_URL}api/getAllAnswer`,
              {
                qid: slug,
              },
              {
                cancelToken: cancelRequest.token,
              }
            )
            .then(function (response) {
              console.log("data", response.data.payload);
              setAllanswer(response.data.payload);
              setisAnswerPost(false);
            });
        } catch (error) {
          console.log("cancel request");

          console.log(error);
        }
      };

      fetchAnswer();

      return () => {
        cancelRequest.cancel();
      };
    }
  }, [isAnswerPost]);

  return (
    <>
      {Allanswer ? (
        <Question
          isPosted={setisAnswerPost}
          Allanswer={Allanswer}
          question={FIlterQuestion}
          question_id={slug}
        />
      ) : (
        <>
          <Flex
            direction={"column"}
            width={"100%"}
            height="100vh"
            justify={"center"}
            align="center"
          >
            <Loader />
          </Flex>
        </>
      )}
    </>
  );
};

export default Slug;
