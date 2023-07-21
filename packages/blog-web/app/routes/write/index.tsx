import { json, type LoaderFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import _ from "lodash";
import React, { useCallback } from "react";
import { MarkdownEditor } from "~/components/markdown/MarkdownEditor";
import MarkdownRender from "~/components/markdown/MarkdownRender";
// import Tag from "~/components/post/Tag";
// import TagLayer from "~/components/post/TagLayer";
import LabelInput from "~/components/system/Labelnput";
import WriteForm from "~/components/write/WriteForm";
import useWrite from "~/hooks/useWrite";
import { getTagList } from "~/lib/api/post";

export const loader: LoaderFunction = async () => {
  const { data } = await getTagList();
  console.log(data.data.tags);
  return json({ tagList: data.data.tags || [] });
};

export default function Index() {
  const navigate = useNavigate();
  const { form, onChange, onChangeContent, closeAction } = useWrite();

  return (
    <WriteForm
      onSubmit={(e) => {
        e.preventDefault();
      }}
      onClick={() => {
        if (!form.title || !form.content)
          return alert("제목과 내용을 입력해주세요.");
        navigate("/write/thumbnail");
      }}
      buttonText={"다음"}
      closeAction={closeAction}
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
        {/* <div className="mb-5">
          <LabelInput
            label="태그"
            placeholder="태그를 입력해주세요"
            type="text"
            name="tags"
            onChange={onChangeTag}
            value={tag}
            onKeyDown={onKeyDown}
          />
        </div> */}
        {/* <div className="mb-5 flex gap-2">
          {_.map(form.tags, (tag) => (
            <Tag key={tag} tag={tag} onClick={tagDelete} />
          ))}
        </div> */}
        <MarkdownEditor onChange={onChangeContent} value={form.content} />
      </div>
      <div className="flex-1 p-3">
        <h2 className="text-5xl mb-5">{form.title}</h2>
        <MarkdownRender markdownText={form.content} />
      </div>
      {/* <TagLayer list={data.tagList} visible={true} selectedTag={[]} /> */}
    </WriteForm>
  );
}
