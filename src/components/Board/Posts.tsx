// 필요한 모듈과 컴포넌트를 가져옵니다.
import React, { useEffect, useState } from 'react';
import axios from 'axios';  // axios는 HTTP 요청을 보내는 라이브러리입니다.
import Pagination from '../common/Pagination/Pagination';
import styles from './posts.module.scss';
import {Link} from 'react-router-dom';

// Post 데이터의 타입을 정의합니다. Post는 id, title, body 세 가지 필드를 가집니다.
interface Post {
  id: number;
  title: string;
  body: string;
}

const Posts: React.FC = () => {
  // 상태 변수를 초기화합니다. posts는 모든 포스트의 배열을 가지고, currentPage는 현재 페이지를 가집니다.
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);  // 한 페이지에 보여줄 포스트의 수

  // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');  // 예시 데이터를 가져옵니다.
      setPosts(response.data);  // 가져온 데이터를 상태 변수에 저장합니다.
    };

    fetchPosts();  // 데이터를 가져오는 함수를 실행합니다.
  }, []);

  // 현재 보여줄 포스트를 계산합니다.
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);  // 전체 포스트 배열에서 현재 페이지의 포스트만 잘라냅니다.

  // 페이지를 변경하는 함수입니다. 이 함수는 Pagination 컴포넌트에 전달될 것입니다.
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 최종적으로 보여줄 JSX를 반환합니다.
  return (
    <div className={styles['posts-container']}>
      <h1>게시판</h1>
      {/* 데이터의 전체 갯수를 표시합니다. */}
      <div className={styles.box}>
        <p className={styles.totalData}>전체 {posts.length}개</p>
      </div>
      <ul className={styles['posts-list']}>
        {currentPosts.map(post => (  // 현재 보여줄 포스트를 순회하면서 각 포스트를 li 요소로 만듭니다.
          <li key={post.id}>
            <Link to={`/post/${post.id}`} className={styles.eachData}>  {/* 각 게시물을 클릭하면 해당 게시물의 상세 페이지로 이동합니다. */}
              <p>{post.title}</p>
              <p>{post.id}</p>
            </Link>
            {/* </div> */}
          </li>
        ))}
      </ul>
      <Pagination
        postsPerPage={postsPerPage}  // Pagination 컴포넌트에 필요한 props를 전달합니다.
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Posts;  // 이 컴포넌트를 다른 파일에서 임포트할 수 있도록 export 합니다.
