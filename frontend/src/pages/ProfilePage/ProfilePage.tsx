import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore"
import { useEffect, useState } from "react";

import styles from './ProfilePage.module.css'

export const ProfilePage = () => {
  const { profile, isLoading, isUpdating, getProfile, updateProfile } = useProfileStore();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    username: '',
    country: '',
    city: '',
  })

  const [errors, setErrors] = useState({
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

  return (
    <div className={styles.profile}>

    </div>
  )
}