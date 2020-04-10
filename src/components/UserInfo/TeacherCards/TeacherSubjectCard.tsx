import { useDispatch } from "react-redux";
import React, { FC } from "react";
import red from "@material-ui/core/colors/red";
import { DeleteForever } from "@material-ui/icons";
import {
  Card,
  Avatar,
  IconButton,
  CardHeader,
  makeStyles,
} from "@material-ui/core";

import { deleteTeacherSubject } from "../../../actions/subject";
import { TeacherSubjectConfig } from "../../../reducers/subjectInterfaces";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  avatar: {
    backgroundColor: red[500],
  },
  removeBtn: {
    marginTop: theme.spacing(),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: 0,
    },
  },
}));

interface RemoveSubjectButtonProps {
  onHandleRemove: () => (id: string) => void;
}

const RemoveSubjectButton = ({ onHandleRemove }: RemoveSubjectButtonProps) => {
  const { removeBtn } = useStyles();
  return (
    <IconButton className={removeBtn} onClick={onHandleRemove}>
      <DeleteForever />
    </IconButton>
  );
};

interface TeacherSubjectCardProps {
  subject: TeacherSubjectConfig;
}

const TeacherSubjectCard: FC<TeacherSubjectCardProps> = ({
  subject,
}: TeacherSubjectCardProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const removeTeacherSubject = (id: string) =>
    dispatch(deleteTeacherSubject(id));

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>{subject.name.slice(0, 1)}</Avatar>
        }
        title={subject.name}
        subheader={"Sheet ID: ".concat(subject.spreadsheetId)}
        action={
          <RemoveSubjectButton
            onHandleRemove={() => removeTeacherSubject(subject._id)}
          />
        }
      />
    </Card>
  );
};

export default TeacherSubjectCard;
