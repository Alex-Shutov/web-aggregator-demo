import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectRolesAtom } from "@components/User/components/Proifle/profile.atoms";
import userApi from "@components/User/user.api";
import { IRole } from "@components/User/components/Proifle/types/IRole.types";
import { authUser } from "@components/User/user.selector";
import { authedAtom } from "@components/User/user.atom";

const UseRoles = () => {
  const [currentRoles, setCurrentRoles] = useRecoilState(projectRolesAtom);
  const [user, setUser] = useRecoilState(authedAtom);
  const [currentRole, setCurrentRole] = useState<IRole | undefined>(
    user?.loadedUser?.projectRoles ?? undefined,
  );
  useEffect(() => {
    if (currentRoles.length) return;
    userApi.getRoles().then((r) => {
      if (r.status === "success") {
        setCurrentRoles(
          r.body.map((el: IRole) => ({
            ...el,
            checked: user.loadedUser?.projectRoles?.id === el.id,
          })),
        );
        if (user.loadedUser?.projectRoles) {
          setCurrentRole(user.loadedUser.projectRoles);
        }
      }
    });
  }, [user]);

  // const currentRole = useMemo(()=>currentRoles?.find(el=>el.checked===true),[])

  const handleChangeCurrent = (id: string) => {
    const updatedRoles = currentRoles.map((role) => {
      if (role.id === id) {
        return { ...role, checked: true };
      } else {
        return { ...role, checked: false };
      }
    });

    setCurrentRoles(updatedRoles);
    setCurrentRole(updatedRoles.find((role) => role.id === id));
    setUser((prev) => ({
      ...prev,
      loadedUser: prev?.loadedUser && {
        ...prev?.loadedUser,
        projectRoles: updatedRoles.find((role) => role.id === id),
      },
    }));
  };

  return {
    roles: currentRoles,
    currentRole: currentRole,
    changeRole: handleChangeCurrent,
  };
};

export default UseRoles;
