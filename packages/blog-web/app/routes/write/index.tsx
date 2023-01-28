import { useNavigate } from "@remix-run/react";
import _ from "lodash";
import React, { useCallback, useState } from "react";
import { MarkdownEditor } from "~/components/markdown/MarkdownEditor";
import MarkdownRender from "~/components/markdown/MarkdownRender";
import Tag from "~/components/post/Tag";
import LabelInput from "~/components/system/Labelnput";
import WriteForm from "~/components/write/WriteForm";
import { useWriteActions, useWriteValue } from "~/states/write";

export default function Index() {
  const [tag, setTag] = useState<string>("");
  const { form } = useWriteValue();

  const navigate = useNavigate();
  const actions = useWriteActions();
  const onChangeContent = useCallback(
    (text: string) => {
      actions.change("content", text);
    },
    [actions]
  );
  const validationTag = useCallback(
    (tag: string) => {
      const resultTag = _.trim(_.replace(tag, "#", ""));
      if (tag === "" || _.includes(form.tags, resultTag)) return;
      actions.change("tags", resultTag);
      setTag("");
    },
    [form, actions]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as "title" | "tags";
    const { value } = e.target;
    actions.change(key, value);
  };

  const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTag(value);
  };

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        validationTag(tag);
      }
    },
    [validationTag, tag]
  );

  const tagDelete = (tag: string) => {
    actions.removeTag(tag);
  };

  return (
    <WriteForm
      onSubmit={(e) => {
        e.preventDefault();
      }}
      onClick={() => navigate("/write/thumbnail")}
      buttonText={"다음"}
    >
      <div className="flex-1 h-full p-3">
        <div className="mb-5">
          <LabelInput
            label="제목"
            placeholder="제목을 입력해주세요"
            type="text"
            name="title"
            onChange={onChange}
            value={form.title}
          />
        </div>
        <div className="mb-5">
          <LabelInput
            label="태그"
            placeholder="태그를 입력해주세요"
            type="text"
            name="tags"
            onChange={onChangeTag}
            value={tag}
            onKeyDown={onKeyDown}
          />
        </div>
        <div className="mb-5 flex gap-2">
          {_.map(form.tags, (tag) => (
            <Tag tag={tag} onClick={tagDelete} />
          ))}
        </div>
        <MarkdownEditor onChange={onChangeContent} value={form.content} />
      </div>
      <div className="flex-1 p-3">
        <h2 className="text-5xl mb-5">{form.title}</h2>
        <MarkdownRender markdownText={form.content} />
      </div>
    </WriteForm>
  );
}