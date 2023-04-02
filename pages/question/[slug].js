import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Question from "../../components/Question";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [Allanswer, setAllanswer] = useState(null);
  // console.log(slug);

  useEffect(() => {
    if (slug) {
      // console.log(slug);
      const fetchAnswer = async () => {
        try {
          const responce = await axios.post(
            `${process.env.NEXT_PUBLIC_Host_URL}api/getAllAnswer`,
            {
              qid: slug,
            }
          );
          console.log("data", responce.data.payload);
          setAllanswer(responce.data.payload);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAnswer();
    }
  }, []);

  return (
    <>
      <Question Allanswer={Allanswer} question_id={slug} />
    </>
  );
};

export default Slug;
