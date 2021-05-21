export class CommonFunction {

    public static getProfilePic(id) {
        let path = `../../../photo/${id}.png`
        var img = new Image();
        img.src = path;
        if(img.height != 0){
            return path
        } else{
            return "../../../assets/profil-picture/avatar.png"
        };
    }
}