import PromptCard from "./PromptCard"

const Profile = ({data, name, description, handleEdit, handleDelete}) => {
  return (
    <section className="w-full">
      <h1 className="head_text tex-left"><span className="blue_gradient">{name} Profile</span></h1>
      <p className="desc text-left ">{description}</p>
      <div className="mt-10 prompt_layout">
        {
          data.map((post) => {
            return (
              <PromptCard key={prompt._id} post={post} handleEdit={()=> handleEdit && handleEdit(post)} handleDelete={()=>handleDelete && handleDelete(post)}/>
            )
          })
        }
      </div>
    </section>
  )
}

export default Profile