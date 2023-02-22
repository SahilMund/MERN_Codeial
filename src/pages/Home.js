// import PropTypes from 'prop-types';
import {Avatar,LikeIcon,CommentIcon} from '../assests';
import { Comment, CreatePost, Loader, FriendsList } from '../components';
import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';


import styles from '../styles/home.module.css';

const Home = () => {

  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
      {posts.data.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src={Avatar}
                alt="user-pic"
              />
              <div>
              <Link
                  to={{
                    pathname: `/user/${post.user._id}`,
                    state: {
                      user: post.user,
                    },
                  }}
                  className={styles.postAuthor}
                >
                  {post.user.name}
                </Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src={LikeIcon}
                  alt="likes-icon"
                />
                <span>{post.likes.length}</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src={CommentIcon}
                  alt="comments-icon"
                />
                <span>2</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            <div className={styles.postCommentsList}>
              {post.comments.map((comment) => (
                <Comment comment={comment}  key={`comment-${comment._id}`} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
    {auth.user && <FriendsList />}
    </div>
  );
};

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default Home;
