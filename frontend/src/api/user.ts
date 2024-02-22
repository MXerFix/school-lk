import $v1 from '.';


export const change_tel = async (tel: string) => {
  return $v1.put('/user/tel', { tel })
}

export const activate_user = async (activation_link: string) => {
  return $v1.post('/activate', { activation_link })
}