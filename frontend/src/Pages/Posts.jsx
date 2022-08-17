import AffichePosts from '../Composants/Posts/AffichePosts';
import CreationPost from '../Composants/Posts/CreationPost';

function Post() {
  return (
    <div>
      <CreationPost />
      <AffichePosts />
    </div>
  );
}

export default Post;
