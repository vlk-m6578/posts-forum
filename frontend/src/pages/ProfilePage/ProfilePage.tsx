import { useProfileStore } from "../../store/profileStore"
import { useEffect, useState } from "react";
import profilePhoto from '../../assets/avatar-placeholder.png'

import styles from './ProfilePage.module.css'
import { toast } from "react-toastify";
import { validateProfileForm } from "../../services/validationService";

interface Errors {
  username: string | undefined,
  country: string | undefined,
  city: string | undefined,
}

export const ProfilePage = () => {
  const { profile, isLoading, isUpdating, getProfile, updateProfile, isEditing, toggleIsEditing } = useProfileStore();

  const [formData, setFormData] = useState({
    username: '',
    country: '',
    city: '',
  })

  const [errors, setErrors] = useState<Errors>({
    username: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        country: profile.country || '',
        city: profile.city || '',
      })
    }
  }, [profile]);

  const handleCancelButtonClick = () => {
    toggleIsEditing();
  }

  const handleSaveButtonClick = async () => {
    const messages = validateProfileForm(formData.username, formData.country, formData.city);

    setErrors({
      username: messages.username,
      country: messages.country,
      city: messages.city,
    });

    if (messages.username || messages.country || messages.city) {
      return;
    }

    try {
      await updateProfile({
        username: formData.username,
        country: formData.country,
        city: formData.city,
      });
      toast.success('Profile updated successfully');
      toggleIsEditing();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  if(isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profile__wrapper}>
        <div className={styles.profile__info}>
          <div className={styles.profile__avatar}>
            <img src={profilePhoto}></img>
          </div>

          <div className={styles.profile__info_wrapper}>
            {
              isEditing ? (
                <div className={styles.profile__edit_form}>
                  <div className={styles.profile__input_wrapper}>
                    <label className={styles.profile__label}>Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Enter username"></input>
                    <span className={styles.profile__error}>{errors.username}</span>
                  </div>

                  <div className={styles.profile__input_wrapper}>
                    <label className={styles.profile__label}>Country</label>
                    <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="Enter country"></input>
                    <span className={styles.profile__error}>{errors.country}</span>
                  </div>

                  <div className={styles.profile__input_wrapper}>
                    <label className={styles.profile__label}>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter city"></input>
                    <span className={styles.profile__error}>{errors.city}</span>
                  </div>

                  <div className={styles.profile__actions}>
                    <button className={styles.profile__btn} onClick={handleCancelButtonClick}>Cancel</button>
                    <button className={styles.profile__btn} onClick={handleSaveButtonClick} disabled={isUpdating}>Save</button>
                  </div>
                </div>


              ) : (
                <div className={styles.profile__details}>
                  <div className={styles.profile__detail}>
                    <span className={styles.profile__detail_header}>Username</span>
                    <span className={styles.profile__detail_value}>{profile?.username}</span>
                  </div>

                  <div className={styles.profile__detail}>
                    <span className={styles.profile__detail_header}>Email</span>
                    <span className={styles.profile__detail_value}>{profile?.email}</span>
                  </div>

                  <div className={styles.profile__detail}>
                    <span className={styles.profile__detail_header}>Location</span>
                    <span className={styles.profile__detail_value}>{profile?.country}, {profile?.city}</span>
                  </div>

                  <div className={styles.profile__detail}>
                    <span className={styles.profile__detail_header}>Member since</span>
                    <span className={styles.profile__detail_value}>{profile?.createdAt ? new Date(profile?.createdAt).toLocaleDateString() : 'Not Available'}</span>
                  </div>
                </div>
              )
            }
          </div>

        </div>
      </div>

    </div>
  )
}