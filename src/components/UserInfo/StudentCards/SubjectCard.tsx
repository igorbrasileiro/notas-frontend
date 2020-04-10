import classnames from "classnames";
import { useDispatch } from "react-redux";
import React, { FC, useState } from "react";
import red from "@material-ui/core/colors/red";
import { ExpandMore, DeleteForever } from "@material-ui/icons";
import {
  Card,
  Avatar,
  Collapse,
  IconButton,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { v5 as uuidv5 } from "uuid";

import { deleteStudentSubject } from "../../../actions/subject";
import { StudentSubjectConfig } from "../../../reducers/subjectInterfaces";

interface SubjectContentProps {
  expanded: boolean;
  onHandleRemove: () => void;
  subject: StudentSubjectConfig;
}

const useSubjectContentStyle = makeStyles((theme: Theme) => ({
  row: {
    display: "flex",
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  gradesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
    columnGap: theme.spacing(),
    gridAutoRows: "1fr",
  },
  grade: {
    width: "100%",
    "&:not(:last-child)": {
      marginRight: theme.spacing(),
    },
  },
}));

const SubjectContent: FC<SubjectContentProps> = ({
  expanded,
  onHandleRemove,
  subject,
}: SubjectContentProps) => {
  const classes = useSubjectContentStyle();

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <div className={classes.row}>
          <TextField
            label="Sua identificação"
            value={subject.studentIdentification}
            margin="normal"
            variant="outlined"
            className={classes.grade}
          />
          <TextField
            label="Coluna de Identificação"
            value={subject.studentIdentificationColumn}
            margin="normal"
            variant="outlined"
            className={classes.grade}
          />
        </div>
        <div className={classes.row}>
          <TextField
            label="Colunas de notas"
            value={subject.gradeColumns}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className={classes.gradesGrid}>
          {subject.grades?.map((grade: string) => (
            <TextField
              key={uuidv5(grade, "MY_CONSTANT")}
              label="Nota"
              value={grade}
              margin="normal"
              variant="outlined"
              className={classes.grade}
              fullWidth
            />
          ))}
        </div>
      </CardContent>
      <CardActions>
        <IconButton onClick={onHandleRemove}>
          <DeleteForever />
        </IconButton>
      </CardActions>
    </Collapse>
  );
};

interface ExpandButtonCardProps {
  expanded: boolean;
  onClick: () => void;
}

const useExpandStyle = makeStyles((theme: Theme) => ({
  expand: {
    marginTop: theme.spacing(),
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: 0,
    },
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const ExpandButtonCard = ({ onClick, expanded }: ExpandButtonCardProps) => {
  const classes = useExpandStyle();

  return (
    <IconButton
      className={classnames(classes.expand, {
        [classes.expandOpen]: expanded,
      })}
      onClick={onClick}
      aria-expanded={expanded}
      aria-label="Show more"
    >
      <ExpandMore />
    </IconButton>
  );
};

interface SubjectCardProps {
  subject: StudentSubjectConfig;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const SubjectCard: FC<SubjectCardProps> = ({ subject }: SubjectCardProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const removeStudentSubject = () =>
    dispatch(deleteStudentSubject(subject._id));

  const handleExpandClick = () => {
    setExpanded((prevState: boolean) => !prevState);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {subject.subject.name.slice(0, 1)}
          </Avatar>
        }
        title={subject.subject.name}
        subheader={subject.subject.createdAt.slice(0, 10)}
        action={
          <ExpandButtonCard expanded={expanded} onClick={handleExpandClick} />
        }
      />
      <SubjectContent
        expanded={expanded}
        subject={subject}
        onHandleRemove={removeStudentSubject}
      />
    </Card>
  );
};

export default SubjectCard;
