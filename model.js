
//to mimic database we create this model. adnminSara and others are users with respective roles
var userRoles={
  adminSara : "admin",
  editorSara : "editor",
  authorSara : "author",
  subSara: "subscriber"
}
 exports.getRoles = (user)=>{
   return userRoles[user]
 }