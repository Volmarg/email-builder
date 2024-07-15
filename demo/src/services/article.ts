import { request } from './axios.config';
import { USER } from '@demo/constants';

export const article = {
  /**
   * @description handles loading the templates from the local storage
   */
  async getArticle(): Promise<IArticle> {

    let queryParams            = new URLSearchParams(window.location.search);
    let templateDataSessionKey = queryParams.get('templateDataSessionKey');
    if (null === templateDataSessionKey) {
      throw new Error("Provided editor query param does not exist 'templateDataSessionKey'");
    }

    let templateDataJson = localStorage.getItem(templateDataSessionKey);
    if (null === templateDataJson) {
      throw new Error("Could not find template data json in local storage for key: " + templateDataSessionKey);
    }

    let templateData = JSON.parse(templateDataJson);
    let templateBody = JSON.parse(templateData.body);

    return templateBody;
  },
  async getArticleList({
    size,
    page,
    userId,
    categoryId,
  }: {
    page: number;
    size: number;
    categoryId: number;
    userId: number;
  }): Promise<ListResponse<IArticle>> {
    return request.get<ListResponse<IArticle>>('/article/visitor/list', {
      params: {
        page,
        size,
        category_id: categoryId,
        user_id: userId,
      },
    });
  },
  async addArticle(data: {
    title: string;
    content: string;
    picture: string;
    summary: string;
  }): Promise<IArticle> {
    return request.post<IArticle>('/article/user/create-article', {
      ...data,
      category_id: USER.categoryId,
      tags: [74],
      secret: 0,
    });
  },
  async updateArticle(
    id: number,
    options: {
      title?: string;
      content?: string;
      picture?: string;
      summary?: string;
    }
  ): Promise<IArticle> {
    return request.post<IArticle>('/article/user/update-article', {
      ...options,
      article_id: id,
      tags: [74],
    });
  },
  async deleteArticle(id: number): Promise<string> {
    return request.get('/article/user/delete', {
      params: {
        article_id: id,
      },
    });
  },
};

export interface ListResponse<T> {
  list: T[];
  count: number;
}

interface content {
  article_id: number;
  content: string;
}
//
export interface IArticle {
  article_id: number;
  user_id: number;
  category_id: number;
  tags: { tag_id: number; }[]; // 由于懒得写接口，这个接口是拿之前的，其实不需要数组
  picture: string;
  title: string;
  summary: string;
  secret: number;
  readcount: number;
  updated_at: number;
  created_at: number;
  level: number;
  content: content;
  templateName: string;
}
